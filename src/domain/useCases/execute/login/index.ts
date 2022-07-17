export type ExecuteLogin = {
  onLogin: (props: ExecuteLogin.Props) => ExecuteLogin.ReturnType
}

export namespace ExecuteLogin {
  export type Props = {
    username: string
    password: string
  }

  export type ReturnType = Promise<void>
}
