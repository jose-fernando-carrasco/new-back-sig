<?php

namespace App\Imports;

use App\Models\Linea;
use Maatwebsite\Excel\Concerns\ToModel;

class LineaImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Linea([
            'code'       => $row['0'],
            'name'       => $row['1'],
            'direccion'  => $row['2'],
            'telefono'   => $row['3'],
            'mail'       => $row['4'],
            'foto'       => $row['5'],
            'descripcion'=> $row['6'],
        ]);
    }
}
