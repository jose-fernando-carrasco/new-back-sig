<?php

namespace App\Imports;

use App\Models\Punto;
use Maatwebsite\Excel\Concerns\ToModel;

class PuntoImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Punto([
            'orden'        => $row['0'],
            'longitud'     => $row['1'],
            'latitud'      => $row['2'],
            'recorrido_id' => $row['3'],
        ]);
    }
}
