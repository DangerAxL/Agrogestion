<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWeighingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('edit weighings');
    }

    public function rules(): array
    {
        return [
            'animal_id' => 'sometimes|required|exists:animals,id',
            'date' => 'sometimes|required|date',
            'weight' => 'sometimes|required|numeric|min:0',
            'daily_gain' => 'nullable|numeric',
        ];
    }
}
