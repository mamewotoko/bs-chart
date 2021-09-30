open Chartjs
open Webapi
open Canvas

let (>>=) e f =
  match e with
    None -> None
  | Some e -> Some (f e)

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

(* https://www.chartjs.org/samples/latest/charts/line/basic.html *)
let param_line =
  param_t
    ~type_:(chart_typeToJs `Line)
    (* ~type_:(chart_typeToJs `HorizontalBar) *)
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
    ~type_:(chart_typeToJs `Doughnut)
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

let scatter_param = Scatter.param_t
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

let bubble_param = Bubble.param_t
                      ~type_:"bubble"
                      ~data:(Bubble.data_t
                               ~datasets:[|Bubble.dataset_t
                                             ~label:"some data"
                                             ~data:[|
                                               { Bubble.x=1.; Bubble.y=1.; Bubble.r=20.; };
                                               { Bubble.x=20.; Bubble.y=3.; Bubble.r=10.; };
                                               { Bubble.x=1.; Bubble.y=4.; Bubble.r=2.; };
                                               { Bubble.x=1.; Bubble.y=5.; Bubble.r=200.; };
                                               { Bubble.x=6.; Bubble.y=9.; Bubble.r=20.; };
                                               { Bubble.x=2.; Bubble.y=10.; Bubble.r=2.; };
                                             |]
                                             ~backgroundColor:"rgba(0,0,255,0.5)"
                                             ~hoverBackgroundColor:"rgba(0,0,255,0.2)"
                                             ~borderColor:"rgba(0,0,255,0.5)"
                                             ()
                               |]
                               ())
                      ~options:(opt_t
                                  ~title:(title_t
                                            ~display:true
                                            ~text:"Chart.js Bubble plot"
                                            ())
                                  ())
                      ()
;;

let main () =
  let draw id f param =
    let context = match Dom.Document.getElementById id Dom.document with
      | None -> raise (Not_found_element "canvas is not found")
      | Some canvas ->
         CanvasElement.getContext2d canvas in
    ignore (f context param) in
  draw "bar" Chartjs.make param1;
  draw "hbar" Chartjs.make param2;
  draw "line" Chartjs.make param_line;

  draw "pie" Chartjs.make pie_param;
  draw "scatter" Chartjs.Scatter.make scatter_param;
  draw "bubble" Chartjs.Bubble.make bubble_param;

  (* contxt >=
   * let context = match Dom.Document.getElementById "canvas" Dom.document with
   *   | None -> raise (Not_found_element "canvas is not found")
   *   | Some canvas ->
   *      Js.log canvas;
   *      CanvasElement.getContext2d canvas in
   * (\* ignore (Chartjs.Scatter.make context param_scatter) *\)
   * ignore (Chartjs.Bubble.make context param_bubble)
   * ignore (Chartjs.Bubble.make context param_bubble) *)
  (* Chartjs.make context pie_param *)
;;

let _ =
  Dom.window
  |> Dom.Window.asEventTarget
  |> Dom.EventTarget.addLoadEventListener (fun _ -> main ())
;;
