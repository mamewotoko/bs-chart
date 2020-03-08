open Chartjs
open Webapi
open Canvas
   
exception Not_found_element of string

let main () =
  let context = match Dom.Document.getElementById "canvas" Dom.document with
    | None -> raise (Not_found_element "canvas is not found")
    | Some canvas ->
       Js.log canvas;
       CanvasElement.getContext2d canvas in
  let param = {
      type_ = "bar";
      data = {
          labels = [|"Red"; "Blue"; "Yellow"; "Green"; "Purple"; "Orange"|];
          datasets = [|{
                        label = "# of Votes";
                        data = [|12.; 19.; 3.; 5.; 2.; 3.|];
                        backgroundColor = [|
                            "rgba(255, 99, 132, 0.2)";
                            "rgba(54, 162, 235, 0.2)";
                            "rgba(255, 206, 86, 0.2)";
                            "rgba(75, 192, 192, 0.2)";
                            "rgba(153, 102, 255, 0.2)";
                            "rgba(255, 159, 64, 0.2)"
                                          |];
                        borderColor = [|
                            "rgba(255, 99, 132, 1)";
                            "rgba(54, 162, 235, 1)";
                            "rgba(255, 206, 86, 1)";
                            "rgba(75, 192, 192, 1)";
                            "rgba(153, 102, 255, 1)";
                            "rgba(255, 159, 64, 1)"
                                      |];
                        borderWidth = 1.
                    }|]
        };
      options = {
          scales = {
              yAxes = [|{
                         ticks = {
                             beginAtZero = true
                           }
                }|]
            }
        }
    } in
  ignore (Chartjs.make context param)
;;

let _ =
  Dom.window
  |> Dom.Window.asEventTarget
  |> Dom.EventTarget.addLoadEventListener (fun _ -> main ()) 
;;
