<?php

namespace App\Http\Services\Mobile;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Services\Mobile\MobileHandler;

class MobileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     //* @return array
     */
    public function toArray($request)
    {
        $mdb = new MobileHandler();

        return $mdb->handle($request);
    }
}
