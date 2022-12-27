<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recorrido extends Model
{
    use HasFactory;
    protected $fillable = ['code','distancia','velocidad','tiempo','color_linea','grosor','descripcion','linea_id'];

}
