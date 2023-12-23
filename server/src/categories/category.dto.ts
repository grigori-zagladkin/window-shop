import {IsBase64, IsString} from "class-validator";
import {SHOULD_BE_BASE64, SHOULD_BE_STRING} from "../constants";

export default class CategoryDto {
    @IsString({ message: SHOULD_BE_STRING })
    title: string;

    @IsString({ message: SHOULD_BE_STRING })
    description: string;

    @IsBase64({ message: SHOULD_BE_BASE64 })
    @IsString({ message: SHOULD_BE_STRING })
    image: string;
}