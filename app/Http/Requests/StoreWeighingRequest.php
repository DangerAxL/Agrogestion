<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWeighingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create weighings');
    }

    public function rules(): array
    {
        return [
            'animal_id' => 'required|exists:animals,id',
            'date' => 'required|date',
            'weight' => 'required|numeric|min:0',
            'daily_gain' => 'nullable|numeric',
        ];
    }
}
