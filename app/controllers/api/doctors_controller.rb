class Api::DoctorsController < ApplicationController
  def show
    @doctor = Doctor.find(params[:id])
  end

  def index
    doctors = Doctor.near(params[:address], 30)

    @doctors = doctors.select do |doctor|
      doc_specs = doctor.specialties.pluck(:name)
      doc_specs.include?(params[:specialty])
    end
  end
end
