<?php

namespace App\Imports;

use App\Models\Recorrido;
use Maatwebsite\Excel\Concerns\ToModel;

class RecorridoImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Recorrido([
            'code'        => $row['0'],
            'distancia'   => $row['1'],
            'velocidad'   => $row['2'],
            'tiempo'      => $row['3'],
            'color_linea' => $row['4'],
            'grosor'      => $row['5'],
            'descripcion' => $row['6'],
            'linea_id'    => $row['7'],
        ]);
    }
}
