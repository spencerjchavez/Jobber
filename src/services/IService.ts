export default interface IService<ParamType, ReturnType> {
    (params: ParamType): Promise<ReturnType>;
}