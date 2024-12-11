import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Tag, Button, Space, List, Tabs, Input, Avatar, Pagination, Skeleton, Form, Flex, Segmented } from 'antd';
import { ShareAltOutlined, SearchOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';

import api, { FeedbackItem } from '@/api/feedback';
import RandomAvatar from './UserDefaultAvatar';
import style from './index.module.less';

const { Title, Paragraph, Text } = Typography;

const FeedbackIndex: React.FC = () => {
  const [resolveTotal, setResolveTotal] = useState(0);
  const [bugTotal, setBugTotal] = useState(0);
  const [currentTab, setCurrentTab] = useState('0');
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // 打开反馈详情
  const handleCardClick = (id: number, item: FeedbackItem) => {
    if (currentTab === '4') {
      window.open(item.issuelUrl);
      return;
    }
    navigate(`/feedback/${id}/detail`);
  };

  // 去发布
  const handleNavigatePost = () => {
    navigate('/feedback/post');
  };

  const tabs = [
    {
      key: '0',
      label: '全部',
    },
    {
      key: '1',
      label: 'BUG',
    },
    {
      key: '2',
      label: '建议',
    },
    {
      key: '3',
      label: '其他',
    },
  ];

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);

  const [type, setType] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>('');
  const [list, setList] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    getFeedbackTotal();
  }, []);

  // 查询反馈总量
  const getFeedbackTotal = async () => {
    const res = await api.queryFeedbackTotal();
    setResolveTotal(res.resolveCount);
    setBugTotal(res.bugCount);
  };
  // 加载列表
  const getList = async (pageNum: number = current, size: number = pageSize, type = 0, title = '') => {
    try {
      setLoading(true);

      const { list, total } = await getFeedbackList({
        pageNum,
        pageSize: size,
        title,
        type,
      });
      setList(list);
      setTotal(total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getTagColor = (type: number) => {
    switch (type) {
      case 1:
        return 'red'; // Bug
      case 2:
        return 'blue'; // 建议
      default:
        return 'default'; // 其他
    }
  };

  const handleChange = (activeKey: string) => {
    setType(Number(activeKey));
    setCurrent(1);
    getList(1, pageSize, Number(activeKey), keyword); // 切换tab时，重置页码
  };

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value === '') {
        setCurrent(1);
        getList(1, pageSize, type);
      } else {
        setCurrent(1);
        getList(1, pageSize, type, value);
      }
    }, 300), // 300ms 的防抖时间
    [type, pageSize],
  );

  const handleSearchChange = (value: string) => {
    setKeyword(value);
    handleSearch(value);
  };

  const handlePageChange = (page: number) => {
    setCurrent(page);
    getList(page, pageSize, type, keyword);
  };

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <div className={style.header}>
          <Flex justify="space-between">
            <div className={style.headerLeft}>
              <Title level={2} className={style.title}>
                问答专栏
              </Title>
              <Space className={style.tags}>
                <Tag color="#2db7f5">用户声音</Tag>
                <Tag color="#87d068">创新分享</Tag>
                <Tag color="#f50">反馈建议</Tag>
              </Space>
              <Paragraph className={style.description}>无论是解惑、反馈，还是分享创新的火花，都在此得到珍视～</Paragraph>
            </div>
            <div className={style.headerRight}>
              <div className={style.statCard}>
                <Text className={style.statNumber}>{bugTotal}</Text>
                <Text className={style.statLabel}>建议</Text>
              </div>
              <div className={style.statCard}>
                <Text className={style.statNumber}>{resolveTotal}</Text>
                <Text className={style.statLabel}>解决</Text>
              </div>
            </div>
          </Flex>
          <Space className={style.headerActions}>
            <Button type="primary" className={style.followButton} onClick={handleNavigatePost}>
              + 发布
            </Button>
            <Button icon={<ShareAltOutlined />} className={style.shareButton}>
              分享
            </Button>
          </Space>
        </div>
        <div className={style.tabsContainer}>
          <Tabs defaultActiveKey="0" items={tabs} className={style.tabs} onChange={(activeKey) => handleChange(activeKey)}></Tabs>
          <Input.Search
            placeholder="根据标题进行检索"
            prefix={<SearchOutlined />}
            // enterButton="false"
            className={style.searchInput}
            value={keyword}
            size="large"
            // onSearch={handleSearchChange}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className={style.listContent}>
          <Skeleton loading={loading} active paragraph={{ rows: 3 }}>
            <List
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item) => (
                <List.Item className={style.qaCard}>
                  <div className={style.cardContent} onClick={() => handleCardClick(item.id)}>
                    {item.userAvatar ? (
                      <Avatar src={item.userAvatar} size={48} className={style.avatar} />
                    ) : (
                      <RandomAvatar size={48} className={style.avatar} seed={item.nickName + ''} />
                    )}
                    <div className={style.middleContent}>
                      <div className={style.itemTitle}>{item.title}</div>

                      <Space size={[0, 8]} wrap>
                        {item.isTop === 1 ? (
                          <Tag key={item.id + Math.random()} className={style.tag} color="#f50">
                            置顶
                          </Tag>
                        ) : null}
                        <Tag key={item.id} color={getTagColor(item.type)} className={style.tag}>
                          {tabs.find((tab) => Number(tab.key) === item.type)?.label}
                        </Tag>
                        {item.isSolve === 1 ? (
                          <Tag key={item.id + Math.random()} className={style.tag} color="success">
                            已解决
                          </Tag>
                        ) : null}
                      </Space>
                    </div>
                    <div className={style.rightContent}>
                      <div className={style.userInfo}>
                        <span className={style.username}>{item.nickName}</span>
                      </div>
                      <div className={style.publishTime}>{item.createdAt}</div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Skeleton>
        </div>
        <div className={style.pageControl}>
          <Pagination total={total} current={current} pageSize={pageSize} onChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default FeedbackIndex;
