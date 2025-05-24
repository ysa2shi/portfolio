<%= ENV['PR_TITLE'] %>

## 変更内容

<% pull_requests.each do |pr| -%>
<%= pr.to_checklist_item %>
<% end -%>