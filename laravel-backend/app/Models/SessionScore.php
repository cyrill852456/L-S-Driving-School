<?php

namespace App\Models;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionScore extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'session_name',
        'score'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
