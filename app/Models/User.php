<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts(){
        return $this->hasMany(Post::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function proyectos(){
        return $this->hasMany(Proyecto::class);
    }

    public function invitaciones_enviadas(){
        return $this->hasMany(Invitacionproyecto::class, 'user_envio_id');
    }

    public function invitaciones_recibidas(){
        return $this->hasMany(Invitacionproyecto::class, 'user_recibe_id');
    }

    public function salas(){
        return $this->hasMany(Sala::class);
    }

    public function invitaciones_salas_enviadas(){
        return $this->hasMany(Invitacionsala::class, 'user_envio_id');
    }

    public function invitaciones_salas_recibidas(){
        return $this->hasMany(Invitacionsala::class, 'user_recibe_id');
    }

    public function esOrganizador(){
        if(Sala::where('user_id', $this->id)->exists()){
            return true;
        }
        return false;
    }

    // public function esColaborador($sala_id){
    //     $inv = Invitacionsala::where('sala_id',$sala_id)->where('user_recibe_id',$this->id)->first();
    //     if($inv == null){ return null;}
    //     if($inv )
    //     return $inv->tipo == 0;
    // }

    public function esVisitante($sala_id){
        $inv = Invitacionsala::where('sala_id',$sala_id)->where('user_recibe_id',$this->id)->first();
        if($inv == null){ return null;}
        return $inv->tipo == 1;
    }

}
