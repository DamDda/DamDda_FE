import React, { useState, useEffect } from "react";
import axios from "axios";
import "./package.css";
import '../../styles/style.css'
import { Header } from "../../layout/Header";
import { Footer } from "../../layout/Footer";

const Package = () => {
  const [reward_name, setReward_name] = useState("");
  const [reward_option, setReward_option] = useState("none");
  const [optionInput, setOptionInput] = useState("");
  const [options, setOptions] = useState([]);
  const [project_package, setProject_package] = useState([]);
  const [package_name, setPackage_name] = useState("");
  const [selected_reward, setSelected_reward] = useState("");
  const [package_limit, setPackage_limit] = useState(0); // 제한 수량 기본값 0
  const [isLimitEnabled, setIsLimitEnabled] = useState(false); // 제한 수량 있음 여부
  const [package_price, setPackage_price] = useState("");
  const [reward_list, setReward_list] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [Snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchGifts();
  }, []);

  const closeSnackbar = () => {
    setTimeout(() => {
      setSnackbar(false);
      setSnackbarMessage("");
    }, 3000);
  };

  const fetchGifts = async () => {
    try {
      const response = await axios.get("/api/project_reward");
      setReward_list(response.data);
    } catch (error) {
      console.error("선물 목록을 가져오는 중 오류 발생:", error);
    }
  };

  const handleGiftAdd = () => {
    if (!reward_name || (reward_option === "select" && options.length === 0)) {
      alert("선물 이름과 옵션을 모두 입력해주세요.");
      return;
    }

    const newGift = { reward_name, options };
    setReward_list([...reward_list, newGift]);

    axios
      .post("/api/project_reward", newGift)
      .then(() => {
        setSnackbarMessage("선물이 추가되었습니다.");
        setSnackbar(true);
        fetchGifts();
        closeSnackbar();
      })
      .catch((error) => console.error("선물 추가 중 오류 발생:", error));

    setReward_name("");
    setOptions([]);
  };

  const handleGiftDelete = (index) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const updatedGifts = [...reward_list];
      updatedGifts.splice(index, 1);
      setReward_list(updatedGifts);
      setSnackbarMessage("선물이 삭제되었습니다.");
      setSnackbar(true);
      closeSnackbar();
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
      package_limit: isLimitEnabled ? package_limit : '무제한', // 제한 수량이 없으면 '무제한'
      giftPrice: parseInt(package_price.replace(/,/g, "")),
      options,
    };

    if (isEditing) {
      const updatedPackages = [...project_package];
      updatedPackages[editingIndex] = newConfig;
      setProject_package(updatedPackages);
      setSnackbarMessage("구성이 수정되었습니다.");
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      setProject_package([...project_package, newConfig]);
      setSnackbarMessage("구성이 추가되었습니다.");
    }

    setSnackbar(true);
    closeSnackbar();

    // 초기화
    setPackage_name("");
    setSelected_reward("");
    setPackage_limit(0);
    setIsLimitEnabled(false);
    setPackage_price("");
    setOptions([]);
  };

  const handleCountChange = (increment) => {
    setPackage_limit((prev) => (prev + increment < 1 ? 1 : prev + increment));
  };

  const handleEdit = (index) => {
    const selectedPackage = project_package[index];
    setPackage_name(selectedPackage.package_name);
    setSelected_reward(selectedPackage.selected_reward);
    setPackage_limit(selectedPackage.package_limit);
    setIsLimitEnabled(selectedPackage.package_limit !== '무제한');
    setPackage_price(selectedPackage.giftPrice.toString());
    setOptions(selectedPackage.options);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleConfigDelete = (index) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const updatedPackages = [...project_package];
      updatedPackages.splice(index, 1);
      setProject_package(updatedPackages);
      setSnackbarMessage("구성이 삭제되었습니다.");
      setSnackbar(true);
      closeSnackbar();
    }
  };

  return (
    <>
    <Header />
     	 <div className="container">

    <div className="package-page">
      <div className="package-section1">
        <h2>선물 옵션</h2>
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
          <button onClick={() => setReward_option("none")}>없음</button>
          <button onClick={() => setReward_option("select")}>선택식</button>
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

        <div className="options-list">
          {options.map((option, index) => (
            <div key={index}>
              {option}{" "}
              <button onClick={() => handleOptionDelete(index)}>삭제</button>
            </div>
          ))}
        </div>

        <button onClick={handleGiftAdd}>선물 추가</button>

        <div className="gift-list">
          {reward_list.length > 0 &&
            reward_list.map((gift, index) => (
              <div key={index}>
                {gift.reward_name}
                <span> {gift.options.join(", ")}</span>
                <button onClick={() => handleGiftDelete(index)}>삭제</button>
              </div>
            ))}
        </div>

        <h2>선물 구성</h2>
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

        {selected_reward && (
          <div>
            <span>선택된 선물: {selected_reward}</span>
          </div>
        )}

        <div>
          <label>제한 수량: </label>
          <button onClick={() => setIsLimitEnabled(false)}>없음</button>
          <button onClick={() => setIsLimitEnabled(true)}>있음</button>
          {isLimitEnabled && (
            <div>
              <button
                onClick={() => handleCountChange(-1)}
                disabled={package_limit <= 1}
              >
                -
              </button>
              <span>{package_limit}</span>
              <button onClick={() => handleCountChange(1)}>+</button>
            </div>
          )}
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
          <span> 원</span>
        </div>

        <button onClick={handleConfigAdd}>
          {isEditing ? "구성 수정" : "구성 추가"}
        </button>

        {Snackbar && <div className="snackbar">{snackbarMessage}</div>}
      </div>

      <div className="package-section2">
        <h3>내가 만든 선물구성</h3>
        {project_package.length > 0 ? (
          project_package.map((config, index) => (
            <div key={index} className="package-card">
              <p>{config.package_limit}개 남음</p>
              
              <h3>
                 {config.giftPrice.toLocaleString()}원
              </h3>
              {config.package_name}
              <ul>
                {config.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              
              <button onClick={() => handleEdit(index)}>수정</button>
              <button onClick={() => handleConfigDelete(index)}>삭제</button>
            </div>
          ))
        ) : (
          <p>추가된 선물 구성이 없습니다.</p>
        )}
      </div>
    </div>
    </div>
    <Footer />
    </>

  );
};

export default Package;
