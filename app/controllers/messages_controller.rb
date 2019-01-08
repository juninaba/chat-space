class MessagesController < ApplicationController
  before_action :set_group

  def index
  end

  def create
  end

  private

  def message_params
  end

  def set_group
    @group = Group.find(params[:id])
  end

end
