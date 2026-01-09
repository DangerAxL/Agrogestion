<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBreedRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create breeds');
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:50|unique:breeds',
        ];
    }
}
