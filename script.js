document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    document.querySelector('.root').classList.add('fade-in');
    
    // 初始化侧边栏切换功能
    initSidebarToggles();
    
    // 初始化菜单项点击事件
    initMenuItems();
    
    // 初始化表单验证（如果有表单）
    initFormValidation();
});

/**
 * 初始化侧边栏切换功能
 */
function initSidebarToggles() {
    // 创建左侧边栏切换按钮
    const leftToggleBtn = document.getElementById('leftSidebarToggle');
    if (leftToggleBtn) {
        leftToggleBtn.addEventListener('click', function() {
            const leftbar = document.querySelector('.leftbar');
            leftbar.classList.toggle('collapsed');
            
            // 更新按钮文本
            this.textContent = leftbar.classList.contains('collapsed') ? '显示左侧栏' : '隐藏左侧栏';
        });
    }
    
    // 创建右侧边栏切换按钮
    const rightToggleBtn = document.getElementById('rightSidebarToggle');
    if (rightToggleBtn) {
        rightToggleBtn.addEventListener('click', function() {
            const rightbar = document.querySelector('.rightbar');
            rightbar.classList.toggle('collapsed');
            
            // 更新按钮文本
            this.textContent = rightbar.classList.contains('collapsed') ? '显示右侧栏' : '隐藏右侧栏';
        });
    }
}

/**
 * 初始化菜单项点击事件
 */
function initMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有菜单项的活动状态
            menuItems.forEach(mi => mi.classList.remove('active'));
            
            // 为当前点击的菜单项添加活动状态
            this.classList.add('active');
            
            // 显示相应的内容（这里只是一个简单的演示）
            const contentId = this.getAttribute('data-content');
            if (contentId) {
                // 隐藏所有内容区域
                document.querySelectorAll('.content-section').forEach(section => {
                    section.style.display = 'none';
                });
                
                // 显示对应的内容区域
                const targetContent = document.getElementById(contentId);
                if (targetContent) {
                    targetContent.style.display = 'block';
                }
            }
        });
    });
}

/**
 * 初始化表单验证
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // 获取表单字段
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // 清除之前的错误信息
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // 验证姓名
            if (!nameInput.value.trim()) {
                showError(nameInput, '请输入您的姓名');
                isValid = false;
            }
            
            // 验证邮箱
            if (!validateEmail(emailInput.value)) {
                showError(emailInput, '请输入有效的邮箱地址');
                isValid = false;
            }
            
            // 验证留言
            if (!messageInput.value.trim()) {
                showError(messageInput, '请输入您的留言');
                isValid = false;
            }
            
            // 如果验证失败，阻止表单提交
            if (!isValid) {
                event.preventDefault();
            } else {
                // 显示提交成功消息（这里只是模拟）
                alert('表单提交成功！');
                event.preventDefault(); // 在实际应用中，如果要通过AJAX提交，则需要阻止默认提交
            }
        });
    }
}

/**
 * 显示表单错误信息
 */
function showError(inputElement, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    
    inputElement.parentNode.appendChild(errorDiv);
    inputElement.style.borderColor = 'red';
}

/**
 * 验证邮箱格式
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}