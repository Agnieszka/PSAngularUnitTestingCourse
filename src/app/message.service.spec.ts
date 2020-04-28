import {MessageService} from "./message.service";

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
  });

    it('should have no messages to start', function () {
      service = new MessageService();

      expect(service.messages.length).toBe(0);
    });

    it('should add a message when message is called', () => {
      service = new MessageService();
      service.add('message1');

      expect(service.messages.length).toBe(1);
    });

  it('should remove all messages when clear is called', function () {
    service = new MessageService();
    service.add('message1');

    service.clear();

    expect(service.messages.length).toBe(0);
  });

});
