from django.contrib import admin

from .models import Patient,Doctor,Consultation,PatientLogin,DoctorLogin, ScheduledTime,Time

# Register your models here.
admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Consultation)
admin.site.register(PatientLogin)
admin.site.register(DoctorLogin)
#admin.site.register(ScheduledTime)
admin.site.register(Time)