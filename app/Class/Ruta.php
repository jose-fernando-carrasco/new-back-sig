<?php

namespace App\Class;

use App\Models\Punto;
use Illuminate\Support\Facades\Log;


use function Psy\debug;

class Ruta
{

    //matriz de incidencia dirigida por peso de arcos
    private $matriz_incidencia;
    private $puntos = [];


    private $punto_inicio; //ID -> DE LOS PUNTOS 
    private $punto_final; //ID -> DE LOS PUNTOS
    private $costoMin;
    private $ruta_min;
    private $rutas = [];



    public function getMatrizIncidencia()
    {
        return $this->matriz_incidencia;
    }

    public function getRutaMin()
    {
        return $this->ruta_min;
    }

    public function getRutas()
    {
        Log::debug($this->punto_inicio);
        Log::debug($this->punto_final);
        return $this->rutas;
    }
    //$coordInicio y $coordFin son arrays de dos elementos, latitud y longitud
    public function __construct($coord_inicio, $coord_final)
    {
        $new_coord_inicio = $this->getCoordenadasCercanas($coord_inicio);
        $new_coord_final = $this->getCoordenadasCercanas($coord_final);
        $this->matrizIncidencia = $this->crearMatrizIncidencia(/* $coordInicio, $coordFin */);
        $this->punto_inicio = array_search($new_coord_inicio, $this->puntos);
        $this->punto_final = array_search($new_coord_final, $this->puntos);
    }


    public function dijkstra()
    {


        $fila_l = [];
        $fila_e = []; //true => permanente, false => temporal
        $p = $this->punto_inicio;
        foreach ($this->puntos as $key => $punto) {
            $fila_l[$key] = INF;
            $fila_e[$key] = false;
        }
        $fila_l[$p] = 0;


        $this->addRoute([$p], 0);

        while ($p != $this->punto_final) {

            $fila_e[$p] = true;
            $newPuntos = [];
            foreach ($this->matriz_incidencia[$p] as $key => $value) {

                if ($fila_e[$key] == false) {

                    if ($fila_l[$key] > $fila_l[$p] + $value) {

                        $newPuntos[$key] = $value;

                        $fila_l[$key] = $fila_l[$p] + $value;
                    }
                }
            }

            $this->addRoute($newPuntos, $p);
            $p = $this->getMin($fila_l, $fila_e);
        }

        $this->costoMin = $fila_l[$this->punto_final];
        $this->ruta_min = $this->calculateRutaMin($this->rutas);
    }


    private function calculateRutaMin($rutas)
    {
        foreach ($rutas as $ruta) {
            if (array_search(end($ruta), $ruta) == $this->punto_final) {
                return $ruta;
            }
        }
    }

    private function getMin($fila_l, $fila_e)
    {
        $min = INF;
        $index = 0;
        foreach ($fila_l as $key => $value) {
            if ($fila_e[$key] == false) {
                if ($value < $min) {
                    $min = $value;
                    $index = $key;
                }
            }
        }
        return $index;
    }

    private function addRoute($new_puntos, $p = 0)
    {
        if (count($this->rutas) == 0) {
            $this->rutas[] = [
                $new_puntos[0] => [
                    'coordenadas' => $this->puntos[$new_puntos[0]],
                    'peso' => 0
                ]
            ];
        } else {
            foreach ($this->rutas as $key => $rutas) {
                if (array_search(end($rutas), $rutas) == $p) {
                    foreach($new_puntos as $punto => $peso){
                        if( $new_puntos[$punto] == end($new_puntos)){
                            $this->rutas[$key][$punto] = [
                                'coordenadas' => $this->puntos[$punto],
                                'peso' => $peso];
                        }else{
                        $new_ruta = array_values($rutas);
                        $new_ruta[$punto] = [
                            'coordenadas' => $this->puntos[$punto],
                            'peso' => $peso
                        ];
                        $this->rutas[] = $new_ruta;
                        }
                    }
                }
            }
        }
    }

    private function crearMatrizIncidencia(/* $coordI, $coordF */)
    {
        $matriz = array();


        Log::debug('comienza nuevos puntos');
        //CREO LA MATRIZ CON PURO 0
        $puntos = Punto::all();

        $fila = array();
        $id = 0;
        foreach ($puntos as $punto) {
            //add at the end of array a new item with its index 
            //and the coordinates of the point
            $this->addPoint($fila, $id, $punto->latitud, $punto->longitud);
        }

        Log::debug('termina nuebos puntos');


        foreach ($this->puntos as $key => $punto) {
            $matriz[$key] = $fila;
        }
        //RELLENO LA MATRIZ CON LOS PESOS DE LOS ARCOS
        // Log::debug($this->puntos);

        Log::debug('comienza recorrido matriz');
        foreach ($matriz as $key => $fila) {
            $matriz[$key] = $this->ponerPesos($key, $fila, $this->puntos[$key][0], $this->puntos[$key][1]);
        }
        Log::debug('termina poner los pessos');

        $this->matriz_incidencia = $matriz;
    }


    //get the weight of the arc between two points
    private function ponerPesos($index_fila, &$fila, $lat1, $lon1)
    {
        $coordO = [$lat1, $lon1];

        $puntosOrigen = Punto::where('latitud', $coordO[0])->where('longitud', $coordO[1])->get();
        $puntosDestino = [];


        foreach ($puntosOrigen as $punto) {
            $puntosDestino[] = Punto::where('orden', '=', $punto->orden + 1)->where('recorrido_id', $punto->recorrido_id)->get();
        }

        foreach ($puntosDestino as $puntos) {
            foreach ($puntos as $punto) {
                // COORDENADA DESTINO D(PUNTOORIGEN, COORDENADADESTINO)
                $coordD = [$punto->latitud, $punto->longitud];
                //get the index of the point in the array
                $index = array_search($coordD, $this->puntos);
                $fila[$index] = $this->getDistancia($coordO[0], $coordO[1], $coordD[0], $coordD[1]);
            }
        }

        foreach ($fila as $key => $value) {
            if ($value == 0 && $key != $index_fila) {
                $fila[$key] = INF;
            }
        }

        return $fila;
    }




    private function getCoordenadasCercanas($coord)
    {
        // coord = [lat, lon]
        $delta = 0;
        $pointsNear = array();

        while (count($pointsNear) < 1) {
            $delta += 0.0009; //aprox 100m
            $pointsNear = Punto::whereBetween('latitud', [$coord[0] - $delta, $coord[0] + $delta])
                ->whereBetween('longitud', [$coord[1] - $delta, $coord[1] + $delta])
                ->get();
        }


        if (count($pointsNear) == 1) return [$pointsNear[0]->latitud, $pointsNear[0]->longitud];

        $distancias = array();
        foreach ($pointsNear as $point) {
            $distancias[] = $this->getDistancia($coord[0], $coord[1], $point->latitud, $point->longitud);
        }

        $min = min($distancias);
        $index = array_search($min, $distancias);

        return [$pointsNear[$index]->latitud, $pointsNear[$index]->longitud];
    }

    //convert length between two geographics points to meters
    private function getDistancia($lat1, $lon1, $lat2, $lon2)
    {
        $R = 6371; // km
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $lat1 = deg2rad($lat1);
        $lat2 = deg2rad($lat2);

        $a = sin($dLat / 2) * sin($dLat / 2) +
            sin($dLon / 2) * sin($dLon / 2) * cos($lat1) * cos($lat2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $d = $R * $c;
        return $d * 1000;
    }

    private function addPoint(&$fila, &$id, $lat, $lon)
    {
        //verified if the coord is already in the array
        foreach ($this->puntos as $point) {
            if ($point[0] == $lat && $point[1] == $lon) return;
        }

        $this->puntos[$id] = array($lat, $lon);
        $fila[$id] = 0;
        $id++;
    }
}
