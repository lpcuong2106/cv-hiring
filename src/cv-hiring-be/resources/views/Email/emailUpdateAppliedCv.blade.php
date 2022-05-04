@component('mail::message')
# Hồ sơ của bạn đã được chuyển sang trạng thái @switch($status)
@case(1)
ứng tuyển
@break
@case(2)
phỏng vấn
@break
@case(3)
đậu việc làm
@break
@case(4)
từ chối việc làm
@break
@case(5)
hủy ứng tuyển
@break
@default

@endswitch


Chúc mừng bạn đã ứng tuyển vào vị trí {{$job->name}}
<br>
Vui lòng liên hệ công ty để biết thêm thông tin chi tiết từ nhà tuyển dụng.
<br>
Chúc bạn may mắn!

@component('mail::button', ['url' => '{{ config('app.url') }}/viec-lam/'. $job->slug])
Xem vị trí đã ứng tuyển
@endcomponent

Cám ơn,<br>
{{ config('app.name') }}
@endcomponent