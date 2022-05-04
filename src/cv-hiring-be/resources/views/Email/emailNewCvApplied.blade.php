@component('mail::message')
#  Một ứng viên mới vừa nộp CV

Chúc mừng bạn đã có thêm ứng viên ứng tuyển vào vị trí {{$job->name}}
<br>
Vui lòng truy cập vào quản trị để biết thêm chi tiết.
<br>
Trân trọng!

@component('mail::button', ['url' => '{{ config('app.url') }}/viec-lam/'. $job->slug])
Xem việc làm
@endcomponent

Cám ơn,<br>
{{ config('app.name') }}
@endcomponent
