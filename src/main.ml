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
                            ~label:"# of Votes"
                            ~data:[|12.; 19.; 3.; 5.; 2.; 3.|]
                            ~backgroundColor:[|
                              "rgba(255, 99, 132, 0.2)";
                              "rgba(54, 162, 235, 0.2)";
                              "rgba(255, 206, 86, 0.2)";
                              "rgba(75, 192, 192, 0.2)";
                              "rgba(153, 102, 255, 0.2)";
                              "rgba(255, 159, 64, 0.2)"
                            |]
                            ~borderColor:[|
                              "rgba(255, 99, 132, 1)";
                              "rgba(54, 162, 235, 1)";
                              "rgba(255, 206, 86, 1)";
                              "rgba(75, 192, 192, 1)";
                              "rgba(153, 102, 255, 1)";
                              "rgba(255, 159, 64, 1)"
                            |]
                            ~borderWidth:1.
                            ();
                        |])
    )
    ~options:(opt_t
                ~scales:(scales_opt_t
                           ~yAxes: [|
                             axis_opt_t
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
    ~type_:(chart_typeToJs `Line)
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
                        |]))
    ~options:(opt_t
                ~responsive:true
                ()
    )
    ()
;;
                             
let main () =
  let context = match Dom.Document.getElementById "canvas" Dom.document with
    | None -> raise (Not_found_element "canvas is not found")
    | Some canvas ->
       Js.log canvas;
       CanvasElement.getContext2d canvas in
  let param = param2 in
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
  ignore (Chartjs.make context param)
;;

let _ =
  Dom.window
  |> Dom.Window.asEventTarget
  |> Dom.EventTarget.addLoadEventListener (fun _ -> main ()) 
;;
