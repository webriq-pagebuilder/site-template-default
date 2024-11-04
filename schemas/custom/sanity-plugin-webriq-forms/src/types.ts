export interface Form {
  id: string;
  name: string;
  owner: string;
  timestamp: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  uploadSize: string;
  notifications: {
    email: {
      bcc: string[];
      cc: string[];
      from: string | null;
      subject: string | null;
      to: string[];
    };
    webhooks?: Webhook[] | undefined;
  };
  recaptcha: {
    isDefault: boolean;
    key: string;
    secret: string;
    version: string;
  };
  siteUrls: string[];
  tags: string[];
  testUrls: string[];
}

interface Webhook {
  name: string;
  url: string;
  status: string
}

export interface Secret {
  apiEmail?: string;
  apiKey?: string;
  primaryDomain: string;
}

export interface Submission {
  attachments: any[];
  createdAt: string;
  form: string;
  id: string;
  payload: any;
  timestamp: number;
  type: string;
  updatedAt: string;
  _nonce?: string;
  onDeleteSubmission: () => void;
}