open Webapi.Canvas
type t

(* line | bar | radar | pie | doughnut | polarArea | bubble | scatter *)
type chart_type = [
  | `Line [@bs.as "line"]
  | `Bar [@bs.as "bar"]
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

type scale_label_t = {
    display: bool [@bs.optional];
    labelString: string [@bs.optional];
  } [@@bs.deriving {abstract = light}]
                 
type axis_opt_t = {
    (* category, linear *)
    type_: string  [@bs.as "type"] [@bs.optional];
    (* bottom *)
    position: string [@bs.optional];
    ticks: ticks_opt_t  [@bs.optional];
    display: bool  [@bs.optional];
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
             
type opt_t = {
    responsive: bool [@bs.optional];
    title: title_t [@bs.optional];
    tool_tips: tool_tips_t [@bs.optional];
    showLines: bool [@bs.optional];
    spanGaps: bool [@bs.optional];
    hover: hover_t [@bs.optional];
    scales: scales_opt_t [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type dataset_t = {
  label: string;
  data: float array;
  backgroundColor: color_t array [@bs.optional];
  borderColor: color_t array [@bs.optional];
  borderWidth: float [@bs.optional];
  fill: bool [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type data_t = {
    labels: string array;
    datasets: dataset_t array
  } [@@bs.deriving {abstract = light}]

type param_t = {
    type_: string [@bs.as "type"] [@bs.optional];
    data: data_t;
    options: opt_t [@bs.optional];
  } [@@bs.deriving {abstract = light}]
   
external make: Canvas2d.t -> param_t -> t = "Chart" [@@bs.new]
