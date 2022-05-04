@component('mail::message')
#  Hủy ứng tuyển thành công

Bạn đã hủy ứng tuyển vị trí {{$job->name}}
<br>
Cám ơn bạn đã sử dụng dịch vụ của chúng tôi. Nếu có bất kì vấn đề gì bạn có thể liên hệ chúng tôi nhé.
<br>
Chúc bạn may mắn!

@component('mail::button', ['url' => '{{ config('app.url') }}/viec-lam/'. $job->slug])
Xem vị trí đã hủy ứng tuyển
@endcomponent

Cám ơn,<br>
{{ config('app.name') }}
@endcomponent
