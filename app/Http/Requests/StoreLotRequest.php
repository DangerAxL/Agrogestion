<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLotRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create lots');
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:50|unique:lots',
            'capacity' => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'active' => 'boolean',
        ];
    }
}
