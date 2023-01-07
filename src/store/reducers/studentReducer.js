const DEFAULT_STATER = {
  studentList: [
    {
      maSV: 1,
      hoTen: "Minh Nguyen",
      soDienThoai: "123456789",
      email: "minh@gmail.com",
    },
    {
      maSV: 2,
      hoTen: "Khoi Do",
      soDienThoai: "012345678",
      email: "khoi@gmail.com",
    },
  ],
  selectedStudent: null,
};

export const studentReducer = (state = DEFAULT_STATER, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_STUDENT": {
      const data = [...state.studentList];

      data.push({
        ...payload,
        id: Date.now(),
      });
      state.studentList = data;
      break;
    }

    case "UPDATE_STUDENT": {
      const data = [...state.studentList];
      const idx = data.findIndex((element) => element.maSV === payload.maSV);
      data[idx] = payload;
      state.studentList = data;
      state.selectedStudent = null;
      break;
    }
    case "DELETE_STUDENT": {
      // const data = [...state.studentList];
      // const idx = data.findIndex(ele => ele.maSV === payload.maSV);
      // data.splice(idx, 1);
      // state.studentList = data;

       state.studentList = state.studentList.filter(ele => ele.maSV === payload.maSV ? false : true)
      break
    }

    case "SET_SELECTED_STUDENT": {
      state.selectedStudent = payload;
    }

    default:
      break;
  }
  return { ...state };
};
