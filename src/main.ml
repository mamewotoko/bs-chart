open Chartjs
open Webapi
open Canvas
   
exception Not_found_element of string

let param1 = 
  param_t
    ~type_:(chart_typeToJs `Bar)
    ~data:(data_t
             ~labels:[|"Red"; "Blue"; "Yellow"; "Green"; "Purple"; "Orange"|]
             ~datasets:([|dataset_t
                            ~label:"Dataset1"
                            ~data:[|12.; 19.; 3.; 5.; 2.; 3.|]
                            ~backgroundColor:[|"Red";"Red";"Red";"Red";"Red";"Red";|]
                            ~borderColor:[|"Red";"Red";"Red";"Red";"Red";"Red";|]
                            ~borderWidth:1.
                            ();
                          dataset_t
                            ~label:"Dataset2"
                            ~data:[|12.; 19.; 3.; 5.; 2.; 3.|]
                            ~backgroundColor:[|"Green";"Green";"Green";"Green";"Green";"Green";|]
                            ~borderColor:[|"Green";"Green";"Green";"Green";"Green";"Green";|]
                            ~borderWidth:1.
                            ();
dataset_t
                            ~label:"Dataset3"
                            ~data:[|12.; 19.; 3.; 5.; 2.; 3.|]
                            ~backgroundColor:[|"Blue";"Blue";"Blue";"Blue";"Blue";"Blue";|]
                            ~borderColor:[|"Blue";"Blue";"Blue";"Blue";"Blue";"Blue";|]
                            ~borderWidth:1.
                            ();
                        |])
             ())
    ~options:(opt_t
                ~scales:(scales_opt_t
                           ~xAxes: [|
                             axis_opt_t
                               (* ~stacked:true *)
                               ()
                           |]
                           ~yAxes: [|
                             axis_opt_t
                               ~stacked:true
                               ~ticks:(ticks_opt_t ~beginAtZero:true)
                               ()
                           |]
                           ()
                )
                ()
    )
    ()
;;

(* https://www.chartjs.org/samples/latest/charts/line/basic.html *)
let param2 =
  param_t
    (* ~type_:(chart_typeToJs `Line) *)
    ~type_:(chart_typeToJs `HorizontalBar)
    ~data:(data_t
             ~labels:[|"January"; "February"; "March"; "April"; "May"; "June"; "July"|]
             ~datasets:([|dataset_t
                            ~label:"My First dataset"
                            (* list or string *)
                            ~backgroundColor:[|"Red";|]
                            ~borderColor:[|"Red";|]
                            ~data:[|93.89; 65.79; 22.57; 33.78; 9.61; 31.21; 2.3|]
                            ~fill:false
                            ();
                          dataset_t
                            ~label:"My Second dataset"
                            ~fill:false
                            ~backgroundColor:[|"Blue";|]
                            ~borderColor:[|"Blue";|]
                            ~data:[|27.99; 15.09; 91.47; 5.92; 15.75; 92.90; 3.4|]
                            ()
                        |])
             ())
    ~options:(opt_t
                ~responsive:true
                ~legend:(legend_t ~position:"right" ())
                ~title:(title_t
                          ~text:"Chart.js Horizontal Bar Chart"
                          ~display:true
                          ())
                ~scales:(scales_opt_t
                           ~xAxes: [|
                             axis_opt_t
                               ~scaleLabel:(scaleLabel_t
                                             ~display:true
                                             ~labelString:"month"
                                             ())
                               ()
                           |]
                           ~yAxes: [|
                             axis_opt_t
                               ~ticks:(ticks_opt_t ~beginAtZero:true)
                               ~gridLines:(gridLines_t ~drawBorder:false ())
                               ~scaleLabel:(scaleLabel_t
                                             ~display:true
                                             ~labelString:"count"
                                             ())
                               ()
                           |]
                           ())
                ())
    ()
;;

let pie_param =
  param_t
    ~type_:(chart_typeToJs `Pie)
    ~data:(data_t
             ~datasets:[|
               dataset_t
                 ~data:[|27.99; 15.09; 91.47; 5.92; 15.75; 92.90;|]
                 ~backgroundColor:[|"Red";"Green";"Blue";"Yellow";"Purple";"Pink"|]
                 ~borderColor:[|"Red";"Green";"Blue";"Yellow";"Purple";"Pink"|]
                 ~hoverBackgroundColor:[|"Red";"Green";"Blue";"Yellow";"Purple";"Pink"|]
                 ~label:"dataset1"
                 ();
             |]
             ~labels:[|"Red";"Green";"Blue";"Yellow";"Purple";"Pink"|]
             ())
    ()
;;
 
  (* let param = param2 in *)
  (* let param = {
   *     type_ = "bar";
   *     data = {
   *         labels = [|"Red"; "Blue"; "Yellow"; "Green"; "Purple"; "Orange"|];
   *         datasets = [|{
   *                       label = "# of Votes";
   *                       data = [|12.; 19.; 3.; 5.; 2.; 3.|];
   *                       backgroundColor = [|
   *                           "rgba(255, 99, 132, 0.2)";
   *                           "rgba(54, 162, 235, 0.2)";
   *                           "rgba(255, 206, 86, 0.2)";
   *                           "rgba(75, 192, 192, 0.2)";
   *                           "rgba(153, 102, 255, 0.2)";
   *                           "rgba(255, 159, 64, 0.2)"
   *                                         |];
   *                       borderColor = [|
   *                           "rgba(255, 99, 132, 1)";
   *                           "rgba(54, 162, 235, 1)";
   *                           "rgba(255, 206, 86, 1)";
   *                           "rgba(75, 192, 192, 1)";
   *                           "rgba(153, 102, 255, 1)";
   *                           "rgba(255, 159, 64, 1)"
   *                                     |];
   *                       borderWidth = 1.
   *                   }|]
   *       };
   *     options = {
   *         scales = {
   *             yAxes = [|{
   *                        ticks = {
   *                            beginAtZero = true
   *                          }
   *               }|]
   *           }
   *       }
   *   } in *)
(* ignore (Chartjs.make context param) *)


(* let random_list scale len =
 *   let rec iter n lst =
 *     if n = 0 then
 *       lst
 *     else
 *       iter (n-1) (Random.float scale)::lst in
 *   iter len []
 * ;;
 * 
 * let random_xy scale_x scale_y len =
 *   let xlst = random_list scale_x len in
 *   let ylst = random_list scale_y len in
 *   map2 (fun x y -> point_t ~x:x ~y:y)
 * ;; *)

let param_scatter = Scatter.param_t
                      ~type_:"scatter"
                      ~data:(Scatter.data_t
                               ~datasets:[| Scatter.dataset_t
                                              ~label:"some data"
                                              ~data:[|
                                                { Scatter.x=1.; Scatter.y=1. };
                                                { Scatter.x=20.; Scatter.y=3. };
                                                { Scatter.x=1.; Scatter.y=4.; };
                                                { Scatter.x=1.; Scatter.y=5.; };
                                                { Scatter.x=6.; Scatter.y=9.; };
                                                { Scatter.x=2.; Scatter.y=10.; };
                                              |]
                                              ~backgroundColor:"Green"
                                              ~borderColor:"Green"
                                            ()
                               |]
                               ())
                      ~options:(Scatter.opt_t
                                  ~title:(Scatter.title_t
                                            ~display:true
                                            ~text:"Chart.js scatter plot"
                                            ())
                                  ())
                      ()
;;

let main () =
  let context = match Dom.Document.getElementById "canvas" Dom.document with
    | None -> raise (Not_found_element "canvas is not found")
    | Some canvas ->
       Js.log canvas;
       CanvasElement.getContext2d canvas in
  (* ignore (Chartjs.Scatter.make context param_scatter) *)
  Chartjs.make context pie_param
  |> ignore
;;

let _ =
  Dom.window
  |> Dom.Window.asEventTarget
  |> Dom.EventTarget.addLoadEventListener (fun _ -> main ()) 
;;
