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

(*
\( \forall n \in N, n = \sqrt{n^2-n + \sqrt{n^2-n + \sqrt{n^2-n + \sqrt{n^2-n + ...}}}} \\
= \sqrt{n(n-1) + \sqrt{n(n-1) + \sqrt{n(n-1) + \sqrt{n(n-1) + ...}}}} \\
 \)
*)

let ann n x =
  sqrt ((n *. n -. n) +. x)

let plot_ann n len element_id color_name =
  (* Printf.printf "%.3f\n" (an2 (an2 (an2 (an2 (an2 (an2 0.))))));
   * Printf.printf "%.3f\n" (an6 (an6 (an6 (an6 (an6 (an6 0.))))));
   * let an7 = ann 7. in *)
  (* Printf.printf "%.3f\n" (an7 (an7 (an7 (an7 (an7 (an7 0.)))))); *)
  let data = Array.make len 0. in
  let color_data = Array.make len color_name in
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
  let param = param_t
                ~type_:(chart_typeToJs `Line)
                ~data:(data_t
                         ~labels:(index_array len)
                         ~datasets:([|dataset_t
                                        ~label:(string_of_int n)
                                        ~data
                                        ~fill:false
                                        ~backgroundColor:color_data
                                        ~borderColor:color_data
                                        ~borderWidth:2.
                                        ();
                                    |])
                         ())
    ~options:(opt_t
                ~scales:(scales_opt_t
                           ~xAxes: [|
                             axis_opt_t
                               ()
                           |]
                           ~yAxes: [|
                             axis_opt_t
                               ~stacked:false
                               ~ticks:(ticks_opt_t ~beginAtZero:true)
                               ()
                           |]
                           ()
                )
                ()
    )
    () in
  let draw id f param =
    let context = match Dom.Document.getElementById id Dom.document with
      | None -> raise (Not_found_element "canvas is not found")
      | Some canvas ->
         CanvasElement.getContext2d canvas in
    ignore (f context param) in
    draw element_id Chartjs.make param;
;;

let main () =
  let len = 20 in
  plot_ann 2 len "an2" "Blue";
  plot_ann 6 len "an6" "Green";
;;

let _ =
  Dom.window
  |> Dom.Window.asEventTarget
  |> Dom.EventTarget.addLoadEventListener (fun _ -> main ())
;;
