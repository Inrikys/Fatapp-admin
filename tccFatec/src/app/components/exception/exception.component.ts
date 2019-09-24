import { Component, Input } from '@angular/core';
import { LanguageMessagesService } from 'src/app/services/language/language-messages.service';


@Component({
  selector: 'fatapp-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.scss'],
})
export class ExceptionComponent {
  public errorMessage = null;
  public exceptionType = null;
  public customException = null;
  public nameIcon = null;
  public typeIcon = null;
  public classIcon = null;

  constructor(
    private languageMessages: LanguageMessagesService,
  ) {
  }

  @Input() set type(val: string) {
    const exception = (val !== undefined && val !== null) ? val : '';
    this.exceptionType = exception;
    this.getMessage(exception);
  }

  @Input() set message(val: string) {
    const exceptionMessage = (val !== undefined && val !== null) ? val : '';
    this.customException = exceptionMessage;
    this.getMessage('custom_message');
  }

  @Input() set iconName(val: string) {
    const icon = (val !== undefined && val !== null) ? val : '';
    this.nameIcon = icon;
  }

  @Input() set iconType(val: string) {
    const type = (val !== undefined && val !== null) ? val : '';
    this.typeIcon = type;
  }

  @Input() set iconClass(val: string) {
    const classe = (val !== undefined && val !== null) ? val : '';
    this.classIcon = classe;
  }


  async getMessage(exceptionType) {
    if (exceptionType !== '' && exceptionType !== 'custom_message') {
      this.errorMessage = this.languageMessages.getMessage(exceptionType);
    } else if (exceptionType === 'custom_message') {
      this.errorMessage = this.languageMessages.createCustomMessage(this.customException);
    }
  }

}