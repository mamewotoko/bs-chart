(* chart.js@^3.5.1 *)
open Webapi.Canvas
type t


(* TODO: define module for each chart_type? *)
(* line | bar | radar | pie | doughnut | polarArea | bubble | scatter *)
type chart_type = [
  | `Line [@bs.as "line"]
  | `Bar [@bs.as "bar"]
  (* | `HorizontalBar [@bs.as "horizontalBar"] *)
  | `Radar [@bs.as "radar"]
  | `Pie [@bs.as "pie"]
  | `Doughnut [@bs.as "doughnut"]
  | `PolarArea [@bs.as "plarArea"]
  | `Bubble [@bs.as "bubble"]
  | `Scatter [@bs.as "scatter"]
  ] [@@bs.deriving jsConverter]
type color_t = string

type ticks_opt_t = {
    beginAtZero: bool
  } [@@bs.deriving {abstract = light}]

type scaleLabel_t = {
    display: bool [@bs.optional];
    labelString: string [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type gridLines_t = {
    drawBorder: bool [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type axis_opt_t = {
    (* category, linear *)
    type_: string  [@bs.as "type"] [@bs.optional];
    (* bottom *)
    position: string [@bs.optional];
    scaleLabel: scaleLabel_t [@bs.optional];
    gridLines: gridLines_t [@bs.optional];
    ticks: ticks_opt_t  [@bs.optional];
    display: bool  [@bs.optional];
    stacked: bool [@bs.optional]; (* bar *)
  } [@@bs.deriving {abstract = light}]

(* TODO: axisID -> config *)
type scales_opt_t = {
    xAxes: axis_opt_t array [@bs.optional];
    yAxes: axis_opt_t array [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type hover_t = {
    mode: string [@bs.optional]
  } [@@bs.deriving {abstract = light}]

type title_t = {
    display: bool [@bs.optional];
    text: string [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type tool_tips_t = {
    (* index *)
    mode: string [@bs.optional];
    intersect: bool [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type legend_t = {
    (* e.g. right *)
    position: string [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type plugins_t = {
    legend: legend_t [@bs.optional];
    title: title_t [@bs.optional];
 } [@@bs.deriving {abstract = light}]

type opt_t = {
    responsive: bool [@bs.optional];
    tool_tips: tool_tips_t [@bs.optional];
    showLines: bool [@bs.optional];
    spanGaps: bool [@bs.optional];
    hover: hover_t [@bs.optional];
    indexAxis: string [@bs.optional]; (* x, y *)
    scales: scales_opt_t [@bs.optional];
    plugins: plugins_t [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type 'a dataset_t = {
  label: string;
  data: 'a array;
  backgroundColor: color_t array [@bs.optional];
  hoverBackgroundColor: color_t array [@bs.optional];
  borderColor: color_t array [@bs.optional];
  borderWidth: float [@bs.optional];
  fill: bool [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type 'a data_t = {
    labels: string array [@bs.optional];
    datasets: 'a dataset_t array [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type param_t = {
    type_: string [@bs.as "type"] [@bs.optional];
    data: float data_t [@bs.optional];
    options: opt_t [@bs.optional];
  } [@@bs.deriving {abstract = light}]

external make: Canvas2d.t -> param_t -> t = "Chart" [@@bs.new]

(* define scatter because data is 2d (x,y) *)
module Scatter =
  struct
    type point_t = {
        x: float;
        y: float;
      }
    type dataset_t = {
        label: string  [@bs.optional];
        data: point_t array [@bs.optional];
        backgroundColor: color_t [@bs.optional];
        borderColor: color_t [@bs.optional];
      } [@@bs.deriving {abstract = light}]

    type data_t = {
        labels: string array [@bs.optional];
        datasets: dataset_t array [@bs.optional];
      } [@@bs.deriving {abstract = light}]

    type title_t = {
        display: bool [@bs.optional];
        text: string [@bs.optional];
      } [@@bs.deriving {abstract = light}]

    type opt_t = {
        responsive: bool [@bs.optional];
        title: title_t [@bs.optional];
        legend: legend_t [@bs.optional];
        tool_tips: tool_tips_t [@bs.optional];
        showLines: bool [@bs.optional];
        spanGaps: bool [@bs.optional];
        hover: hover_t [@bs.optional];
        scales: scales_opt_t [@bs.optional];
      } [@@bs.deriving {abstract = light}]

    type param_t = {
        type_: string [@bs.as "type"] [@bs.optional];
        data: data_t [@bs.optional];
        options: opt_t [@bs.optional];
      } [@@bs.deriving {abstract = light}]

    external make: Canvas2d.t -> param_t -> t = "Chart" [@@bs.new]
  end

module Bubble =
  struct
    type point_t = {
        x: float;
        y: float;
        r: float;
      }

    type dataset_t = {
        label: string  [@bs.optional];
        data: point_t array [@bs.optional];
        backgroundColor: color_t [@bs.optional];
        hoverBackgroundColor: color_t [@bs.optional];
        borderColor: color_t [@bs.optional];
      } [@@bs.deriving {abstract = light}]

    type data_t = {
        labels: string array [@bs.optional];
        datasets: dataset_t array [@bs.optional];
      } [@@bs.deriving {abstract = light}]

    type param_t = {
        type_: string [@bs.as "type"] [@bs.optional]; (** should be "bubble" *)
        data: data_t [@bs.optional];
        options: opt_t [@bs.optional];
      } [@@bs.deriving {abstract = light}]

    external make: Canvas2d.t -> param_t -> t = "Chart" [@@bs.new]
  end
