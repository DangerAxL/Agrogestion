<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeedTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create feed-types');
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100|unique:feed_types',
            'composition' => 'nullable|string',
        ];
    }
}
