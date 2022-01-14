import { useMutation } from '@apollo/client';
import * as React from 'react';
import {
  CREATE_USEDITEM_QUESTION,
  FETCH_USEDITEM_QUESTIONS,
  UPDATE_USEDITEM_QUESTION,
} from './HomeLetterWrite.queries';
import InputComment from '../../../../commons/inputs/comment/index';

export default function HomeLetterWrite(props) {
  const [letter, setLetter] = React.useState('');
  const [createUseditemQuestion] = useMutation(CREATE_USEDITEM_QUESTION);
  const [updateUseditemQuestion] = useMutation(UPDATE_USEDITEM_QUESTION);

  async function onPressSubmit() {
    try {
      const result = await createUseditemQuestion({
        variables: {
          createUseditemQuestionInput: {
            contents: letter,
          },
          useditemId: props.route.params?.useditemId,
        },
        refetchQueries: [
          {
            query: FETCH_USEDITEM_QUESTIONS,
            variables: {
              useditemId: props.route.params?.useditemId,
            },
          },
        ],
      });

      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function onPressEdit() {
    try {
      await updateUseditemQuestion({
        variables: {
          updateUseditemQuestionInput: {
            contents: letter,
          },
          useditemQuestionId: props.usedQId,
        },
        refetchQueries: [
          {
            query: FETCH_USEDITEM_QUESTIONS,
            variables: { useditemId: props.useditemId },
          },
        ],
      });
      props.setIsEdit(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  function onChangeLetter(event) {
    setLetter(event.nativeEvent.text);
  }

  return (
    <>
      <InputComment
        placeholder={props.isEdit ? '수정할 내용을 입력해주세요.' : '편지 내용을 작성해주세요.'}
        onChange={onChangeLetter}
        onPress={props.isEdit ? onPressEdit : onPressSubmit}
        text={props.isEdit ? '수정' : '등록'}
      />
    </>
  );
}
