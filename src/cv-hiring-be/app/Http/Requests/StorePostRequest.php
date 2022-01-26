<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|min:6'
        ];
    }

    public function messages()
    {
        return [
            'title.required' => "Trường này là bắt buộc",
            'title.min'     => "Yêu cầu ít nhất 7"
        ];
    }
}
