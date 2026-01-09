<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFeedingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('edit feedings');
    }

    public function rules(): array
    {
        return [
            'lot_id' => 'sometimes|required|exists:lots,id',
            'feed_type_id' => 'sometimes|required|exists:feed_types,id',
            'date' => 'sometimes|required|date',
            'ration_kg' => 'sometimes|required|numeric|min:0',
            'total_ration' => 'sometimes|required|numeric|min:0',
        ];
    }
}
