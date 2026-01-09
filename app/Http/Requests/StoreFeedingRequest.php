<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeedingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create feedings');
    }

    public function rules(): array
    {
        return [
            'lot_id' => 'required|exists:lots,id',
            'feed_type_id' => 'required|exists:feed_types,id',
            'date' => 'required|date',
            'ration_kg' => 'required|numeric|min:0',
            'total_ration' => 'required|numeric|min:0',
        ];
    }
}
