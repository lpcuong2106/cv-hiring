@component('mail::message')
#  Ứng tuyển thành công

Chúc mừng bạn đã ứng tuyển vào vị trí {{$job->name}}
<br>
Vui lòng đợi thông tin duyệt hồ sơ từ nhà tuyển dụng.
<br>
Chúc bạn may mắn!

@component('mail::button', ['url' => 'http://localhost:3000/viec-lam/'. $job->slug])
Xem vị trí đã ứng tuyển
@endcomponent

Cám ơn,<br>
{{ config('app.name') }}
@endcomponent
