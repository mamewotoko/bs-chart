open Webapi.Canvas
type t

(* bar | line | bubble *)
type chart_type = string
type color_t = string

type ticks_opt_t = {
    beginAtZero: bool
  } [@@bs.deriving {abstract = light}]

type axis_opt_t = {
    ticks: ticks_opt_t
  } [@@bs.deriving {abstract = light}]

type scales_opt_t = {
    yAxes: axis_opt_t array
  } [@@bs.deriving {abstract = light}]

type opt_t = {
    scales: scales_opt_t
  } [@@bs.deriving {abstract = light}]

type dataset_t = {
  label: string;
  data: float array;
  backgroundColor: color_t array [@bs.optional];
  borderColor: color_t array [@bs.optional];
  borderWidth: float [@bs.optional];
  } [@@bs.deriving {abstract = light}]

type data_t = {
    labels: string array;
    datasets: dataset_t array
  } [@@bs.deriving {abstract = light}]

type param_t = {
    type_: chart_type [@bs.as "type"] [@bs.optional];
    data: data_t;
    options: opt_t;
  } [@@bs.deriving {abstract = light}]
   
external make: Canvas2d.t -> param_t -> t = "Chart" [@@bs.new]
