(* chartjs *)
open Core

let _ =
  if (Array.length Sys.argv) <> 2 then
    begin
      Printf.eprintf "usage: %s chartjs_config_filename" Sys.argv.(0);
      Pervasives.exit 1
    end;
  let filename = Sys.argv.(1) in
  In_channel.read_all filename
  |> Chartjs_j.param_t_of_string
  |> Chartjs_j.string_of_param_t
  |> print_endline
