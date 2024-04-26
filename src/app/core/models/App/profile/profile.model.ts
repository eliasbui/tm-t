export class ProfileResponse {
    public error_code: string;
    public error_message: string;
    public data?: any;
  code: string;
  
    constructor(fields?: Partial<ProfileResponse>) {
      if (fields) {
        Object.assign(this, fields);
      }
    }
  }

  export class ProfileRequest {
    public fullname: string;
    public phone: string;
    public language: string;
  
    constructor(fields?: Partial<ProfileRequest>) {
      if (fields) {
        Object.assign(this, fields);
      }
    }
  }


  export class ProfilePassword {
    public old_password: string;
    public new_password: string;
  
    constructor(fields?: Partial<ProfileRequest>) {
      if (fields) {
        Object.assign(this, fields);
      }
    }
  }

  export class Profile {
    public fullname: string;
    public user_id: string;
    public username: string;
    public phone: string;
    public email: string;
    public address: string;
    public role: string;
    public role_id: string;
    public status: string;
    public last_login: string;
    public created_date: string;
    public center_name: string;
    public center_id: string;
    public avatar: string;
    public language: string;
  
    constructor(fields?: Partial<ProfileRequest>) {
      if (fields) {
        Object.assign(this, fields);
      }
    }
  }

  

