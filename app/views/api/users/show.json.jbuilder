
json.session do
  json.partial! "api/users/user", user: @user
  json.appointment_ids @user.appointments.pluck(:id)
  json.review_ids @user.reviews.pluck(:id)
end

user_apps = @user.appointments.includes(:doctor, :reviews)

json.appointments do
  user_apps.each do |app|
    json.set! app.id do
      json.partial! "api/appointments/appointment", appointment: app
      json.address app.doctor.get_address
      json.doctor_name "#{app.doctor.first_name} #{app.doctor.last_name}"
    end
  end
end

json.reviews do
  user_reviews.each do |review|
    json.set! review.id do
      json.partial! "api/reviews/review", review: review
    end
  end
end

json.doctors do
  @doctors.each do |doctor|
    json.set! doctor.id do
      json.partial! "api/doctors/doctor", doctor: doctor
    end
  end
end
