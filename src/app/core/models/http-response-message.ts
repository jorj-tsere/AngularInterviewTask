export interface HttpResponseMessage {
  success: boolean;
  status: number;
  body: HttpResponseBody;
}

interface HttpResponseBody {
  showMessage: boolean;
  message: string;
  data: any;
}
