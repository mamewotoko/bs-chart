open Chartjs
open Webapi
open Canvas

exception Not_found_element of string

let index_array len =
  let d = Array.make len "" in
  for i = 0 to len - 1 do
    d.(i) <- string_of_int i
  done;
  d
;;


(* https://twitter.com/pickover/status/1272696555338940426  *)
(*
\(2 = \sqrt{2 + \sqrt{2 + \sqrt{2 + \sqrt{2 + ...}}}}\)
 *)

let an2 x =
  sqrt (2. +. x)

(*
 \(6 = \sqrt{30 + \sqrt{30 + \sqrt{30 + \sqrt{30 + ...}}}}\)
 *)

let an6 x =
  sqrt (30. +. x)

  (* Printf.printf "%.3f\n" (an2 (an2 (an2 (an2 (an2 (an2 0.))))));
   * Printf.printf "%.3f\n" (an6 (an6 (an6 (an6 (an6 (an6 0.))))));
   *)

(*
\( \forall n \in N, n = \sqrt{n^2-n + \sqrt{n^2-n + \sqrt{n^2-n + \sqrt{n^2-n + ...}}}} \\
= \sqrt{n(n-1) + \sqrt{n(n-1) + \sqrt{n(n-1) + \sqrt{n(n-1) + ...}}}} \\
 \)
*)

let ann n x =
  sqrt ((n *. n -. n) +. x)

let plot_ann n len element_id color_name =
    (*  pattern1: use array *)
  let data = Array.make len 0. in
  let nf = float_of_int n in
  let rec iter prev i =
    if len <= i then
      ()
    else
      begin
        data.(i) <- sqrt ((nf *. nf -. nf) +. prev);
        iter data.(i) (i+1)
      end in
  iter 0. 0;
  let opt = opt_t
              ~scales:(scales_opt_t
                         ~yAxes: [|
                           axis_opt_t
                             (* ~stacked:false *)
                             ~ticks:(ticks_opt_t ~beginAtZero:true)
                             ()
                         |]
                         ()
              )
              () in
  let param = param_t
                ~type_:(chart_typeToJs `Line)
                ~data:(data_t
                         ~labels:(index_array len)
                         ~datasets:([|dataset_t
                                        ~label:(string_of_int n)
                                        ~data
                                        ~fill:false
                                        ~borderColor:[|color_name|] (* TODO: array or one color name*)
                                        ();
                                    |])
                         ())
                ~options:opt
                () in
  let context = match Dom.Document.getElementById element_id Dom.document with
    | None -> raise (Not_found_element "canvas is not found")
    | Some canvas ->
       CanvasElement.getContext2d canvas in
  ignore (Chartjs.make context param)
;;

type app_dataset_t = {
   data: float list;
   label: string;
   color: string;
  }

let plot_line datasets element_id =
  let opt = opt_t
              ~scales:(scales_opt_t
                         ~yAxes: [|
                           axis_opt_t
                             (* ~stacked:false *)
                             ~ticks:(ticks_opt_t ~beginAtZero:true)
                             ()
                         |]
                         ()
              )
              () in
  let chartjs_datasets = List.map (fun x ->
                             dataset_t
                               ~label:x.label
                               ~data:(Array.of_list x.data)
                               ~borderColor:[|x.color|]
                               ~fill:false
                               ())
                           datasets
                       |> Array.of_list in
  let datalen = (List.hd datasets).data |> List.length in
  let param = param_t
                ~type_:(chart_typeToJs `Line)
                ~data:(data_t
                         ~labels:(index_array datalen)
                         ~datasets:chartjs_datasets
                         ())
                ~options:opt
                () in
  let context = match Dom.Document.getElementById element_id Dom.document with
    | None -> raise (Not_found_element "canvas is not found")
    | Some canvas ->
       CanvasElement.getContext2d canvas in
  ignore (Chartjs.make context param)
;;

let apply_sequence f len =
  (* pattern2: use list *)
  let rec iter prev len rev_result =
    if len = 0 then
      List.rev rev_result
    else
      let current = f prev in
      iter current (len-1) (current::rev_result) in
  iter 0. len []
;;

let range s e =
  (* end exclusive *)
  let rec iter current result =
    if current < s then
      result
    else
      iter (current-1) (current::result) in
  iter (e-1) []
;;

let main () =
  (* plot_ann 2 len "an2" "Blue";
   * plot_ann 6 len "an6" "Green"; *)
  let len = 20 in
  let pallete = [|"Red"; "Green"; "Blue"; "Yellow"; "Purple"; "Aqua"; "Pink"|] in
  let data n =
    let color = pallete.(n-2) in
    {
        data = apply_sequence (ann (float_of_int n)) len;
        label = (string_of_int n);
        color = color;
    } in
  let d2 = data 2 in
  let d6 = data 6 in
  plot_line [d2] "an2";
  plot_line [d6] "an6";
  let dataset = List.map data (range 2 (2 + (Array.length pallete))) in
  plot_line dataset "plot_simple"
  (* plot_line [{ data = [1.;2.;3.;4.;5.]; label = "label"; color = "Red"}] "plot_simple" *)
;;

let _ =
  Dom.window
  |> Dom.Window.asEventTarget
  |> Dom.EventTarget.addLoadEventListener (fun _ -> main ())
;;
