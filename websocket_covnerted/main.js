function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var COLORS = null;
var config = {};

var ctx = $("#canvas")[0].getContext('2d');
var start = 0;
var COLORS = null;
var PREFIX = 'buf';
var USE_DATA_HEADER = false;
var socket = null;
var initialized = false;
var start_timestamp = 0;
var chart;

function init_config(line){
    var row = line.split(',');
    COLORS = [];
    //column
    config.type = 'line';
    config.data = {
        labels: [],
        datasets: []
    };
    config.options = {
        animation: false,
        scales: {
            yAxes:[
                {
                    ticks:{
                        beginAtZero: true,
                        min: -1,
                        max: 1,
                    }
                }
            ]
        }
    };
    try {
        parseInt(row[0]);
        USE_DATA_HEADER = false;
    }
    catch(e){
        USE_DATA_HEADER = true;
    }
    for (var index = 1; index < row.length; index++){
        var rowindex = index - 1;
        COLORS.push(getRandomColor());

        var header = null;
        if(USE_DATA_HEADER){
            header = row[index];
        }
        else {
            header = PREFIX+rowindex;
        }
        config.data.datasets.push({label: header,
                                   borderColor: COLORS[rowindex],
                                   backgroundColor: COLORS[rowindex],
                                   data:[],
                                   hidden: true,
                                   fill: false});
    }
    var headers = ['roll', 'pitch', 'view'];
    for (var index = 0; index < headers.length; index++){
        COLORS.push(getRandomColor());
        var header = headers[index];
        config.data.datasets.push({label: header,
                                   borderColor: COLORS[COLORS.length-1],
                                   backgroundColor: COLORS[COLORS.length-1],
                                   data:[],
                                   fill: false});
    }
}

function init_plot(){
    window.chart = new Chart(ctx, config);
}

function plot_data(lines){
    if(!initialized){
        init_config(lines[0]);
        initialized = true;
    }
    
    for (var i = 0; i < lines.length; i++){
        var line = lines[i];
        if(line.length == 0 || line.charCodeAt(0) == 0){
            //console.log("no timestamp continue");
            continue;
        }

        var row = line.split(',');
        var timestamp = parseInt(row.shift());
        if(start_timestamp == 0){
            start_timestamp = timestamp;
        }
        var roll = ((row[1] & 0x03) << 8) + (row[0] & 0xFF);
        var sroll = Number(roll).toString(16);

        // if((roll & 0x200) == 0x200){
        //     roll = -1*(0x400 - roll);
        // }
        var pitch = ((row[2] & 0x0f) << 6) | (((row[1] & 0xfc) >> 2) & 0x3F);
        spitch = Number(pitch).toString(16);
        console.log("spitch %s", spitch);

        var view = (row[2] & 0xf0) >> 4;

        row = row.concat([roll, pitch, view]);
        config.data.labels.push(timestamp - start_timestamp);
        //column
        for (var index = 0; index < row.length; index++){
            config.data.datasets[index].data.push(parseInt(row[index]));
        }
        row.unshift(timestamp);
        var elm = $('#csvdata');
        var csvline = row.join(",")+"\n";
        console.log(csvline);
        var csv = elm.val() + csvline;
        elm.val(csv);
    }
    //TODO; remove empty row
    //next_row_index = lines.length - 1;
    window.chart.update();
}

function main(){
    init_plot();
    
    var uri = "ws://localhost:7681/lws-minimal";
    socket = new WebSocket(uri);
    socket.onopen = onOpen;
    socket.onmessage = onMessage;
    socket.onclose = onClose;
    socket.onerror = onError;
}

function onOpen(event){
    console.log("opened");
}

function onClose(event){
    console.log("closed");
}

function onError(event){
    console.log("error");
}

function onMessage(event){
    console.log(event);
    //var elm = $('#csvdata');
    //var csv = elm.val()+event.data;
    //elm.val(csv);
    var newcsv = event.data.split("\n");
    plot_data(newcsv);
}

$(document).ready(function(){
    main();
});
