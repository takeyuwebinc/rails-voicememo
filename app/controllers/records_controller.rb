class RecordsController < ApplicationController
  def index
    @records = Record.all
    @record = Record.new
  end

  def create
    record_params = params.require(:record).permit(:voice)
    @record = Record.new(record_params)
    if @record.save
      head :created
    else
      head :unprocessable_entity
    end
  end
end
