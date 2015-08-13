require 'test_helper'

class MessagesControllerTest < ActionController::TestCase
  setup do
    @message = messages(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:messages)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create message" do
    assert_difference('Message.count') do
      post :create, message: { authnum: @message.authnum, authorization: @message.authorization, clientid: @message.clientid, dob: @message.dob, emailordering: @message.emailordering, ethnicity: @message.ethnicity, evidence: @message.evidence, firstnameordering: @message.firstnameordering, firstnamepatient: @message.firstnamepatient, gender: @message.gender, icd10: @message.icd10, lastnameordering: @message.lastnameordering, lastnamepatient: @message.lastnamepatient, mailordering: @message.mailordering, memberid: @message.memberid, ndc11: @message.ndc11, nntval: @message.nntval, npiordering: @message.npiordering, patientid: @message.patientid, phoneorering: @message.phoneorering, planfax: @message.planfax, planid: @message.planid, planphone: @message.planphone, preauth: @message.preauth, receiverid: @message.receiverid, senderid: @message.senderid, seqid: @message.seqid, servicedate: @message.servicedate, servicepriority: @message.servicepriority, servicesite: @message.servicesite }
    end

    assert_redirected_to message_path(assigns(:message))
  end

  test "should show message" do
    get :show, id: @message
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @message
    assert_response :success
  end

  test "should update message" do
    patch :update, id: @message, message: { authnum: @message.authnum, authorization: @message.authorization, clientid: @message.clientid, dob: @message.dob, emailordering: @message.emailordering, ethnicity: @message.ethnicity, evidence: @message.evidence, firstnameordering: @message.firstnameordering, firstnamepatient: @message.firstnamepatient, gender: @message.gender, icd10: @message.icd10, lastnameordering: @message.lastnameordering, lastnamepatient: @message.lastnamepatient, mailordering: @message.mailordering, memberid: @message.memberid, ndc11: @message.ndc11, nntval: @message.nntval, npiordering: @message.npiordering, patientid: @message.patientid, phoneorering: @message.phoneorering, planfax: @message.planfax, planid: @message.planid, planphone: @message.planphone, preauth: @message.preauth, receiverid: @message.receiverid, senderid: @message.senderid, seqid: @message.seqid, servicedate: @message.servicedate, servicepriority: @message.servicepriority, servicesite: @message.servicesite }
    assert_redirected_to message_path(assigns(:message))
  end

  test "should destroy message" do
    assert_difference('Message.count', -1) do
      delete :destroy, id: @message
    end

    assert_redirected_to messages_path
  end
end
