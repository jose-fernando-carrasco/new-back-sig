<?php

namespace App\Http\Controllers;

use App\Imports\LineaImport;
use App\Imports\PuntoImport;
use App\Imports\RecorridoImport;
use App\Models\Linea;
use App\Models\Punto;
use App\Models\Recorrido;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class LineaController extends Controller
{
    public function index(){
        $lineas = Linea::all();
        return response()->json(['lineas' => $lineas],200);
    }

    public function getLinea($nro){
        $code = '';        
        if ( $nro>0 & $nro<10 ){ $code = 'L00'.$nro; } 
        if ( $nro>9 & $nro<100){ $code = 'L0'.$nro; }
        if ( $nro>99){ $code = 'L'.$nro; }
        $linea = Linea::where('code',$code)->first();
        return response()->json(['linea' => $linea],200); 
    }

    public function getRecorridoIda($nro){
        $codeR = '';        
        if ( $nro>0 & $nro<10 ){ $codeR = 'L00'.$nro.'I'; } 
        if ( $nro>9 & $nro<100){ $codeR = 'L0'.$nro.'I'; }
        if ( $nro>99){ $codeR = 'L'.$nro.'I'; }
        $recorrido = Recorrido::where('code',$codeR)->first();
        return response()->json(['recorrido' => $recorrido],200); 
    }

    public function getRecorridoVuelta($nro){
        $codeR = '';        
        if ( $nro>0 & $nro<10 ){ $codeR = 'L00'.$nro.'V'; } 
        if ( $nro>9 & $nro<100){ $codeR = 'L0'.$nro.'V'; }
        if ( $nro>99){ $codeR = 'L'.$nro.'V'; }
        $recorrido = Recorrido::where('code',$codeR)->first();
        return response()->json(['recorrido' => $recorrido],200); 
    }

    public function getPuntosIda($nro){
        $codeR = '';        
        if ( $nro>0 & $nro<10 ){ $codeR = 'L00'.$nro.'I'; } 
        if ( $nro>9 & $nro<100){ $codeR = 'L0'.$nro.'I'; }
        if ( $nro>99){ $codeR = 'L'.$nro.'I'; }
        $recorrido = Recorrido::where('code',$codeR)->first();
        $puntos = Punto::select('puntos.*')->join('recorridos','puntos.recorrido_id','=','recorridos.id')->where('puntos.recorrido_id',$recorrido->id)->orderBy('orden','asc')->get();
        return response()->json(['puntos' => $puntos],200); 
    }

    public function getPuntosVuelta($nro){
        $codeR = '';        
        if ( $nro>0 & $nro<10 ){ $codeR = 'L00'.$nro.'V'; } 
        if ( $nro>9 & $nro<100){ $codeR = 'L0'.$nro.'V'; }
        if ( $nro>99){ $codeR = 'L'.$nro.'V'; }
        $recorrido = Recorrido::where('code',$codeR)->first();
        $puntos = Punto::select('puntos.*')->join('recorridos','puntos.recorrido_id','=','recorridos.id')->where('puntos.recorrido_id',$recorrido->id)->orderBy('orden','asc')->get();
        return response()->json(['puntos' => $puntos],200); 
    }


    public function import(Request $request){
        if($request->contra != '8235570E'){return redirect()->back();}
        Excel::import(new LineaImport,$request->file('excel'));
        return redirect()->back();
    }

    public function recorrido(Request $request){
        if($request->contra1 != '8235570E'){return redirect()->back();}
        Excel::import(new RecorridoImport,$request->file('excel1'));
        return redirect()->back();
    }

    public function puntos(Request $request){
        if($request->contra2 != '8235570E'){return redirect()->back();}
        Excel::import(new PuntoImport,$request->file('excel2'));
        return redirect()->back();
    }
    
    public function getRuta(Request $request){
        
    }

}
