json.partial! "api/doctors/doctor", doctor: @doctor

json.extract! @doctor, :education, :professional_statement

# json.reviews @doctor.reviews.pluck(:id)
