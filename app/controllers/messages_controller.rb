class MessagesController < ApplicationController
  before_action :set_message, only: [:show, :edit, :update, :destroy]

  # GET /messages
  # GET /messages.json
  def index
    @messages = Message.all
  end

  # GET /messages/1
  # GET /messages/1.json
  def show
  end

  # GET /messages/new
  def new
    @message = Message.new
  end

  # GET /messages/1/edit
  def edit
  end

  # POST /messages
  # POST /messages.json
  def create
    @message = Message.new(message_params)

    respond_to do |format|
      if @message.save
        doctor_id = @message.sender_id
        @doctor = Doctor.find(doctor_id)
        format.html { redirect_to @doctor, notice: 'Message was successfully created.' }
        format.json { render :show, status: :created, location: @message }
      else
        format.html { render :new }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /messages/1
  # PATCH/PUT /messages/1.json
  def update
    respond_to do |format|
      if @message.update(message_params)
        format.html { redirect_to @message, notice: 'Message was successfully updated.' }
        format.json { render :show, status: :ok, location: @message }
      else
        format.html { render :edit }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    @message.destroy
    respond_to do |format|
      format.html { redirect_to messages_url, notice: 'Message was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def approve
    @message = Message.find(params[:id])
    insurer_id = @message.receiver_id
    @message.authorization = 1
    @insurer = Insurer.find(insurer_id)
    @message.save
    redirect_to @insurer
  end

  def deny
    @message = Message.find(params[:id])
    insurer_id = @message.receiver_id
    @message.authorization = 0
    @insurer = Insurer.find(insurer_id)
    @message.save
    redirect_to @insurer
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def message_params
      params.require(:message).permit(:authnum, :firstnamepatient, :lastnamepatient, :dob, :ethnicity, :gender, :icd10, :ndc11, :evidence, :nntval, :servicedate, :servicepriority, :servicesite, :firstnameordering, :lastnameordering, :npiordering, :phoneorering, :emailordering, :mailordering, :clientid, :planid, :planphone, :planfax, :memberid, :patientid, :authorization, :preauth, :seqid, :sender_id, :receiver_id)
    end
end
