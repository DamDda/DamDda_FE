import React, { useState, useEffect } from "react";
import axios from "axios";
import "./package.css"; // 필요한 스타일은 여기서 정의

const Package = () => {
  // 상태 관리
  const [reward_name, setReward_name] = useState(""); // 선물이름
  const [reward_option, setReward_option] = useState("none"); // 선물옵션 'none' or 'select'
  const [optionInput, setOptionInput] = useState("");
  const [options, setOptions] = useState([]);
  const [project_package, setProject_package] = useState([]); //선물구성
  const [package_name, setPackage_name] = useState(""); // 선물구성이름
  const [selected_reward, setSelected_reward] = useState(""); // 선물선택
  const [package_limit, setPackage_limit] = useState(1); // 수량제한
  const [package_price, setPackage_price] = useState(""); //선물구성 가격
  const [reward_list, setReward_list] = useState([]); // 선물 리스트
  const [Snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    // 페이지 로딩 시 선물 리스트 불러오기
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const response = await axios.get("/api/project_reward");
      setReward_list(response.data);
    } catch (error) {
      console.error("Error fetching project_reward:", error);
    }
  };

  const handleGiftAdd = () => {
    if (!reward_name || (reward_option === "select" && options.length === 0)) {
      alert("선물 이름과 옵션을 모두 입력해주세요.");
      return;
    }

    const newGift = { reward_name, options };
    setProject_package([...project_package, newGift]);

    // 서버에 선물 저장
    axios
      .post("/api/project_reward", newGift)
      .then(() => {
        setSnackbarMessage("선물이 추가되었습니다.");
        setSnackbar(true);
        fetchGifts(); // 선물 리스트 업데이트
      })
      .catch((error) => console.error("Error adding project_reward:", error));

    // 초기화
    setReward_name("");
    setOptions([]);
  };

  const handleGiftDelete = (index) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const updatedGifts = [...project_package];
      updatedGifts.splice(index, 1);
      setProject_package(updatedGifts);
      setSnackbarMessage("선물이 삭제되었습니다.");
      setSnackbar(true);
    }
  };

  const handleOptionAdd = () => {
    if (optionInput) {
      setOptions([...options, optionInput]);
      setOptionInput("");
    }
  };

  const handleOptionDelete = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleConfigAdd = () => {
    if (!package_name || !selected_reward || !package_price) {
      alert("구성 이름, 선물, 가격을 모두 입력해주세요.");
      return;
    }

    const newConfig = {
      package_name,
      selected_reward,
      package_limit,
      giftPrice: parseInt(package_price.replace(/,/g, "")),
    };

    // 서버에 저장
    axios
      .post("/api/project_package", newConfig)
      .then(() => {
        setSnackbarMessage("구성이 추가되었습니다.");
        setSnackbar(true);
      })
      .catch((error) => console.error("Error adding project_package:", error));
  };

  const handleCountChange = (increment) => {
    setPackage_limit((prev) => {
      if (prev + increment < 1) return 1;
      return prev + increment;
    });
  };

  return (
    <div className="package-page">
      <div className="package-section1">
        <h2>선물 구성 추가하기</h2>
        <div>
          <label>선물 이름: </label>
          <input
            type="text"
            value={reward_name}
            onChange={(e) => setReward_name(e.target.value)}
          />
        </div>

        <div>
          <label>옵션 조건: </label>
          <button
            value={reward_option}
            onChange={(e) => setReward_option(e.target.value)}
          >
            <option value="none">없음</option>
          </button>
          <button
            value={reward_option}
            onChange={(e) => setReward_option(e.target.value)}
          >
            <option value="select">선택식</option>
          </button>
        </div>

        {reward_option === "select" && (
          <div>
            <input
              type="text"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              placeholder="옵션을 입력해주세요"
            />
            <button onClick={handleOptionAdd}>추가</button>
          </div>
        )}

        <div>
          {options.map((option, index) => (
            <div key={index}>
              {option}{" "}
              <button onClick={() => handleOptionDelete(index)}>X</button>
            </div>
          ))}
        </div>

        <button onClick={handleGiftAdd}>선물 추가</button>

        {/* 선물 구성 추가 섹션 */}
        <h2>선물 구성 추가</h2>
        <div>
          <label>구성 이름: </label>
          <input
            type="text"
            value={package_name}
            onChange={(e) => setPackage_name(e.target.value)}
          />
        </div>

        <div>
          <label>선물 선택: </label>
          <select
            value={selected_reward}
            onChange={(e) => setSelected_reward(e.target.value)}
          >
            <option value="">선물 선택</option>
            {reward_list.map((gift, index) => (
              <option key={index} value={gift.reward_name}>
                {gift.reward_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>수량: </label>
          <button
            onClick={() => handleCountChange(-1)}
            disabled={package_limit <= 1}
          >
            -
          </button>
          <span>{package_limit}</span>
          <button onClick={() => handleCountChange(1)}>+</button>
        </div>

        <div>
          <label>가격: </label>
          <input
            type="text"
            value={package_price}
            onChange={(e) =>
              setPackage_price(
                e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              )
            }
          />
        </div>

        <button onClick={handleConfigAdd}>구성 추가</button>

        {/* 스낵바 */}
        {Snackbar && <div className="snackbar">{snackbarMessage}</div>}
      </div>

      {/* 추가된 선물 리스트 */}
      <div className="package-section2">
        <h3>내가 만든 선물구성</h3>
        {project_package.length > 0 ? (
          project_package.map((config, index) => (
            <div key={index} className="package-card">
              <h4>
                {config.package_name} - {config.package_price}원
              </h4>
              <ul>
                {config.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              <button onClick={() => handleGiftDelete(index)}>삭제</button>
            </div>
          ))
        ) : (
          <p>추가된 선물 구성이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Package;
